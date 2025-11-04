import React from 'react';
import AddButton from "../components/buttons/AddButton.tsx";
import ThemeToggleButton from "../components/buttons/ThemeToggleButton.tsx";
import ThemeProvider from "../types/themeContext.tsx";

const TaskList = React.lazy(() => import("./../components/TaskList.tsx"));

function HomePage() {
    return (
    <>
        <ThemeProvider>
            <header className={`grid grid-cols-6 p-4 bg-gray-200`}>
                <h1 className={"col-start-2 col-span-3 text-center text-3xl font-semibold"}>Task Manager</h1>
                <AddButton />
                <ThemeToggleButton />
            </header>
            <main className="flex justify-center p-4 mt-6">
                <TaskList />
            </main>
        </ThemeProvider>
    </>
  );
}

export default HomePage;