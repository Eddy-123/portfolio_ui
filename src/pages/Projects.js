import { useState, useEffect } from "react";
import List from "../components/List";
import { Link as RouterLink } from "react-router-dom";

import React from 'react'

// TODO: RouterLink is not rendering the links

function Projects({ userName }) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`https://api.github.com/users/${userName}/repos`);
            const result = await data.json();

            if(result) {
                setProjects(result);
                setLoading(false);
            }
        }

        fetchData();
    }, [userName]);

  return (
    <div className="Projects-container">
        <h2>Projects</h2>
        {loading ? (
            <span>Loading...</span>
        ) : (
            <div>
                <List items={projects.map((project) => ({
                    field: project.name,
                    value: <RouterLink 
                                url={project.html_url} 
                                title={project.html_url}
                            />
                }))} />
            </div>
        )}
    </div>
  );
}

export default Projects;