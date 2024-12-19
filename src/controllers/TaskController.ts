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

    static getTaskById = async (req: Request, res: Response): Promise<void> => {
        try {

            res.json(req.task)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }
    static updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params
            const task = await Task.findByIdAndUpdate(taskId, req.body)
            if (!task) {
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({ error: error.message })
            }

            res.send("Tarea actualizada correctamente")

        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }

    static deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {

            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send("Tarea eliminada correctamente")

        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }

    static updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {

            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send("Tarea actualizada")
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' })
        }
    }



}