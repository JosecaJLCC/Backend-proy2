import cleverbot from 'cleverbot-free'

export const chat = async(req, res) =>{
    const question = req.body;
    // Procesar la pregunta y generar una respuesta adecuada utilizando la lógica del chatbot
    const reply = processQuestion(question);

    res.json(reply);
}

function processQuestion(question) {
    // Aquí puedes implementar tu lógica personalizada para generar respuestas
    // Puedes utilizar la API de funciones para obtener información adicional si es necesario
  
    const reply = {
      sender: 'Chatbot',
      text: '¡Hola! Soy el chatbot y estoy listo para ayudarte.',
    };
  
    return reply;
  }