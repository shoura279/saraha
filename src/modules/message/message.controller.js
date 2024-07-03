import Message from './message.model';
import mongoose from 'mongoose';
import joi from 'joi'


export const addMessage = async (req, res) => {
  // extract info from body and params
  const receiverId = req.params;
  const content = req.body;

  // validate the receiver id
const schema =joi.object({
  receiverId: joi.string().required()
})
const {error} = schema.validate(req.params)
if (error) return res.send(error)

  // prepare message 
  const message = new Message({
    content,
    receiverId
  })

  // add to db 
  await message.save().then
  // send response
  res.send(message)

}

// GET all messages
export const getMessage = async (req, res) => {
  // extract info from params
  const { receiverId } = req.params
  // check existence of receiverId 
  const schema = joi.object({
    receiverId: joi.string().required()
  })
  const { error } = schema.validate(req.params)
  if (error) return res.send(error)

  // const { receiverId } = req.params
  const message = await Message.find({ receiverId })
  res.send(message)
}


// Delete message
 export const deleteMessage = async (req, res) => {
  // extract info from body 
  const { id } = req.params
  // validate the message existence 
  const schema = joi.object({
    id: joi.string().required()
  })
  const { error } = schema.validate(req.params)
  if (error) {return res.send(error) }

  await findByIdAndDelete(id)
  res.send('message deleted')}
  

