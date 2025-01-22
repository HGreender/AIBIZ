from openai import OpenAI

with open('A:/key.txt', 'r') as file:
    key = file.read()
url = 'https://api.vsegpt.ru/v1'

client = OpenAI(
    # Ваш ключ в VseGPT после регистрации
    api_key=key,
    base_url=url,
)

prompt = "Напиши последовательно числа от 1 до 10"

messages = list()
# messages.append({"role": "system", "content": system_text})
messages.append({"role": "user", "content": prompt})

response_big = client.chat.completions.create(
    # id модели из списка моделей - можно использовать OpenAI, Anthropic и пр. меняя только этот параметр
    model="openai/gpt-4",
    messages=messages,
    temperature=0.7,
    n=1,
    # максимальное число ВЫХОДНЫХ токенов. Для большинства моделей не должно превышать 4096
    max_tokens=3000,
    # опционально - передача информация об источнике API-вызова
    extra_headers={"X-Title": "My App"},
)

# print("Response BIG:",response_big)
response = response_big.choices[0].message.content
print("Response:", response)