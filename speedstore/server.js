const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const path = require('path');

const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-2803828925105459-080709-0ebd6fd6b7fe1a96d4561f4fc9fd38db-2256521183' 
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/criar-pagamento', async (req, res) => {
    try {
        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: req.body.items,
                back_urls: {
                    success: "https://google.com",
                    failure: "https://google.com",
                    pending: "https://google.com"
                },
                auto_return: "approved"
            }
        });
        res.json({ init_point: response.init_point });
    } catch (error) {
        console.error('Erro no Mercado Pago:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`SPEED STORE rodando em http://localhost:${PORT}`));
