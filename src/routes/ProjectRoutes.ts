import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProject } from '../middleware/project'

const router = Router()

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del Cliente es obligatorio'),
    body('description').notEmpty().withMessage('La Descripción es obligatoria'),
    handleInputErrors,
    ProjectController.createProjects)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.put('/:id',
    body('projectName').notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del Cliente es obligatorio'),
    body('description').notEmpty().withMessage('La Descripción es obligatoria'),
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject)


//Routes for tasks
router.param('projectId', validateProject)
router.post('/:projectId/tasks',
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La Descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTasks)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La Descripción de la tarea es obligatoria'),
    TaskController.updateTask
)
export default router