const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

const SUNO_API_KEY = process.env.SUNO_API_KEY;
const SUNO_API_URL = process.env.SUNO_API_URL || 'https://api.suno.com/v1';

app.post('/api/generate', async (req, res) => {
    const { style, description } = req.body;
    console.log(`Gerando música estilo: ${style} com descrição: ${description}`);

    if (!SUNO_API_KEY) {
        return res.status(500).json({ success: false, message: 'API key não configurada' });
    }

    try {
        const response = await fetch(`${SUNO_API_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUNO_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: description,
                tags: style,
                title: `Aryys - ${style}`,
                wait_audio: true
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro da API Suno:', data);
            return res.status(500).json({ success: false, message: 'Erro ao gerar música' });
        }

        const clip = Array.isArray(data) ? data[0] : data;
        const audioUrl = clip?.audio_url || clip?.stream_audio_url || null;

        res.json({
            success: true,
            message: 'Música gerada com sucesso!',
            audio_preview: audioUrl
        });
    } catch (err) {
        console.error('Erro ao chamar API Suno:', err.message);
        res.status(500).json({ success: false, message: 'Erro ao contactar API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Aryys Music pronto na porta ${PORT}`));
