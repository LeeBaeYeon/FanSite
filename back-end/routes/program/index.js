const express = require('express')
const router = express.Router()

const Program = require('../../models/program.js')

/**
 *  @swagger
 *  tags:
 *    name: program
 *    description: API to manage User.
 */

/**
 * @swagger
 * /program:
 *  get:
 *    summary: Get program data list.
 *    tags: [program]
 *    responses:
 *      200:
 *        description: Get program data list
 */
router.get('/', async function (req, res, next) {
  try {
    let query = await Database.select(TABLE_NAME, [], req.query)

    res.status(200).json(query)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

/**
 * @swagger
 * /program/{id}:
 *  get:
 *    summary: Get program data.
 *    tags: [program]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: program PK
 *        type: Integer
 *    responses:
 *      200:
 *        description: Get program data object
 */
router.get('/:id', async function (req, res, next) {
  try {
    let query = await Database.select(TABLE_NAME, [], { id: req.params.id })

    if (query.length == 1) {
      res.status(200).json(query[0])
    } else {
      res.status(200).json(query)
    }
  } catch (e) {
    console.log(e.message)
    res.status(400).send(e)
  }
})

/**
 * @swagger
 * /program:
 *  post:
 *    summary: Insert program data.
 *    tags: [program]
 *    parameters:
 *      - in: body
 *        name: program
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            role:
 *              type: string
 *            start_date:
 *              type: string
 *            end_date:
 *              type: string
 *    responses:
 *      200:
 *        description: Insert program data
 */
router.post('/', async function (req, res, next) {
  try {
    let query = await Database.insert(TABLE_NAME, req.body)

    res.status(200).json(query)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

/**
 * @swagger
 * /program/{id}:
 *  put:
 *    summary: Update program data.
 *    tags: [program]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: program PK
 *        type: Integer
 *      - in: body
 *        name: program
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            role:
 *              type: string
 *            start_date:
 *              type: string
 *            end_date:
 *              type: string
 *    responses:
 *      200:
 *        description: Update program data
 */
router.put('/:id', async function (req, res, next) {
  try {
    let query = await Database.insert(TABLE_NAME, req.body, {
      id: req.params.id,
    })

    if (query != 'NOT FOUND') {
      res.status(200).json(query)
    } else {
      res
        .status(400)
        .json({ resultCode: 'fail', resultMsg: '[ERROR] HISTORY NOT FOUND' })
    }
  } catch (e) {
    res.status(400).send(e)
  }
})

/**
 * @swagger
 * /program/{id}:
 *  delete:
 *    summary: Delete program data.
 *    tags: [program]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: program PK
 *        type: Integer
 *    responses:
 *      200:
 *        description: Delete program data
 */
router.delete('/:id', async function (req, res, next) {
  try {
    let query = await Database.delete(TABLE_NAME, { id: req.params.id })

    if (query.affectedRows > 0) {
      res.status(200).json({ resultCode: 'success' })
    } else {
      res
        .status(400)
        .json({ resultCode: 'fail', resultMsg: '[ERROR] HISTORY NOT FOUND' })
    }
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
