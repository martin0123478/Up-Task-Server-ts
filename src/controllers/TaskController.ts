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
            await task.save()
            await req.project?.save()
            res.send('Tarea Creada Correctamente')
        } catch (error) {
            console.log(error)
        }
    }
}