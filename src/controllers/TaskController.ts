import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'
import mongoose from 'mongoose';
export class TaskController {
    static createTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = new Task(req.body)
            task.project = req.project?.id
            req.project?.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project?.save()])
            res.send('Tarea Creada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }
    static getProjectTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }

    }
}