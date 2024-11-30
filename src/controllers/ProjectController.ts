import type { Request, Response } from "express";
import Project from "../models/Project";
export class ProjectController {


    static createProjects = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

        try {
            const project = await Project.findByIdAndUpdate(id, req.body)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }
            await project?.save()
            res.send('Proyecto actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }
            await project?.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}