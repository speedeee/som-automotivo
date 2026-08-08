import telebot

TOKEN = '8151528447:AAG9Nq6Y5A2f5oJ_Vls0_qA1-0iE1oP8Q4E'
bot = telebot.TeleBot(TOKEN)

# Comando /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Olá! Eu sou o seu bot. Como posso ajudar você hoje?")

# Resposta para qualquer mensagem de texto
@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.reply_to(message, f"Você disse: {message.text}")

print("Bot rodando com sucesso...")
bot.infinity_polling()
