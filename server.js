const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/api/generate', (req, res) => {
    const { style, description } = req.body;
    console.log(`Gerando música estilo: ${style} com descrição: ${description}`);

    res.json({ 
        success: true, 
        message: 'Pedido recebido com sucesso!',
        audio_preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
    });
});

app.listen(3000, () => console.log('Servidor Aryys Music pronto na porta 3000'));
