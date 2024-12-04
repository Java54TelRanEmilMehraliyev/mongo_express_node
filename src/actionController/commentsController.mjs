import { Router } from 'express'; 
import asyncHandler from 'express-async-handler';
import Joi from 'joi';
import validate from '../middleware/validation.mjs';

export default class CommentsController {
  constructor(mflixService) {
    this.mflixService = mflixService;
    this.router = this.#initRoutes();
  }

  #initRoutes() {
    const router = Router(); 

   
    const schemaCommentUpdate = Joi.object({
      commentId: Joi.string().hex().length(24).required(),
      text: Joi.string().required(),
    });

   
    router.post(
      "/",
      validate(schemaCommentUpdate),
      asyncHandler(this.#addComment.bind(this)) 
    );

    router.put(
      "/",
      validate(schemaCommentUpdate),
      asyncHandler(this.#updateComment.bind(this))
    );

    router.delete(
      "/:id",
      asyncHandler(this.#deleteComment.bind(this))
    );

    router.get(
      "/:id",
      asyncHandler(this.#getComment.bind(this))
    );

    return router; 
  }

 
  async #addComment(req, res) {
    const commentDB = await this.mflixService.addComment(req.body);
    res.status(201).json(commentDB);
  }

  
  async #updateComment(req, res) {
    if (req.error_message) {
      throw { code: 400, text: req.error_message };
    }
    const commentUpdated = await this.mflixService.updateCommentText(req.body);
    res.status(200).json(commentUpdated);
  }

  
  async #deleteComment(req, res) {
    const deletedComment = await this.mflixService.deleteComment(req.params.id);
    res.status(200).json(deletedComment);
  }


  async #getComment(req, res) {
    const comment = await this.mflixService.getComment(req.params.id);
    res.status(200).json(comment);
  }
}