using System.Text.Json;

namespace task_manager;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddAuthorization();
        
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());

            options.AddPolicy("AllowSpecific", policy =>
                policy.WithOrigins("https://example.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });

        var app = builder.Build();
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseCors("AllowAll");
        app.UseAuthorization();
        
        var logger = app.Logger;
        
        List<TaskItem> GetTasks()
        {
            var tasksFile = Path.Combine(app.Environment.ContentRootPath, "./storage/tasks.json");
            var tasks = new List<TaskItem>();
            if (File.Exists(tasksFile))
            {
                var json = File.ReadAllText(tasksFile);
                tasks = JsonSerializer.Deserialize<List<TaskItem>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<TaskItem>();
            }
            return tasks;
        }

        app.MapGet("/task", (HttpContext httpContext) =>
            {
                var tasks = GetTasks();
                
                var tasksJson = JsonSerializer.Serialize(tasks);
                logger.LogInformation("Tasks: {Tasks}", tasksJson);
                
                return Results.Json(tasks);
            })
            .WithName("GetAllTasks")
            .WithOpenApi();

        app.MapDelete("/task/{id:int}", (int id) =>
            {
                var tasks = GetTasks();
                bool isFound = tasks.Any(x => x.Id == id);
                if (!isFound) return Results.NotFound();

                var updatedTasks = tasks.Where(t => t.Id != id);
                var tasksFile = Path.Combine(app.Environment.ContentRootPath, "./storage/tasks.json");
                var updatedTasksJson = JsonSerializer.Serialize(updatedTasks);
                File.WriteAllText(tasksFile, updatedTasksJson);
                
                logger.LogInformation("Tasks after delete: {Tasks}", updatedTasksJson);
                return Results.Ok();
            })
            .WithName("DeleteTaskById")
            .WithOpenApi();
        
        app.MapPost("/task", (TaskItem? newTask) =>
        {
            if(newTask == null) return Results.BadRequest();
            
            var tasks = GetTasks();
            var newId = tasks.Any() ? tasks.Max(t => t.Id) + 1 : 1;
            
            newTask.Id = newId;
            tasks.Add(newTask);
            
            var tasksFile = Path.Combine(app.Environment.ContentRootPath, "./storage/tasks.json");
            var updatedTasksJson = JsonSerializer.Serialize(tasks);
            File.WriteAllText(tasksFile, updatedTasksJson);
            
            logger.LogInformation("Tasks after create: {Tasks}", updatedTasksJson);
            return Results.Created($"/task/{newTask.Id}", newTask);
        })
        .WithName("CreateTask")
        .WithOpenApi();
        
        app.MapPatch("/task/{id:int}", (int id, TaskItem? updatedTask) =>
            {
                if(updatedTask == null) return Results.BadRequest();
            
                var tasks = GetTasks();
                
                updatedTask.Id = id;
                if(tasks.All(t => t.Id != id)) return Results.NotFound();

                var updatedTasks = tasks
                    .Select(t => t.Id == id ? updatedTask : t)
                    .ToList();
                
                var tasksFile = Path.Combine(app.Environment.ContentRootPath, "./storage/tasks.json");
                var updatedTasksJson = JsonSerializer.Serialize(updatedTasks);
                File.WriteAllText(tasksFile, updatedTasksJson);
            
                logger.LogInformation("Tasks after update: {Tasks}", updatedTasksJson);
                return Results.Ok(updatedTask);
            })
            .WithName("UpdateTaskById")
            .WithOpenApi();

        app.Run();
    }
}