# Basic SQL

## Не забываем установить зависимости

```shell
npm install
```

## Чтобы запустить код жмите

```shell
npm start
```

## Вставляем ваш SQL-код строкой в метод ```query```(он возвращает промис). Учитывайте, что вы пробрасываете строку из js, но это не значит что на sql уровне не должно быть кавычек для строк. Поэтому будьте внимательны

```js
await client.query('INSERT INTO table_name VALUES(\'name\', \'notname\');');
```

## Это можно делать много раз

## В первой функции ```createStructure``` вы напишите SQL-запросы, которые создадут структуру БД

## Во второй функции ```createItems``` вы напишите SQL-запросы, которые создадут конкретные записи

## Лучше для задачи создадите отдельную базу(чтобы не загрязнять глобальную postgres). Протестируйте все запросы и потом удалите все таблицы и пробуйте запускать перенося SQL-код в функции и запуская их. Учитывайте, что будет ошибка, если вы создаете таблицу, которая уже создана.

## У вас есть функция ```initConnection``` в которой вы видите подключение к базе из nodejs. Заменяйте строки на свои(если вы создали базу, то название указывайте в ```database``` просто строкой). Не убирайте логические ИЛИ перед вашими строками и те переменные, это нужно для запуска проверки, когда вы запушите

## Итак, нужна такая структура(везде должны быть значения, ```NOT NULL```, также все внешние ключи должны иметь ```ON DELETE CASCADE```):

### Пользователь(таблица```users```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```name```)Имя пользователя, должна быть строкой с ограничением в 30 символов
- (```date```)Дату регистрации, должно быть датой и иметь дефолт во время создания

### Категория(таблица ```categories```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```name```)Название категории, должна быть строкой с ограничением в 30 символов

### Автор(таблица```authors```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```name```) Имя фамилия автора, должна быть строкой с ограничением в 30 символов

### Книга(таблица ```books```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```title```) Название книги, должна быть строкой с ограничением в 30 символов
- (```userid```) пользователь, который выложил книгу, вторичный ключ, ссылается на таблицу ```users``` колонку ```id```
- (```authorid```) автор книги, вторичный ключ, ссылается на таблицу ```authors``` колонку ```id```
- (```categoryid```) категория книги, вторичный ключ, ссылается на таблицу ```categories``` колонку ```id```

### Описание(таблица```descriptions```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```description```) описание книги, должна быть строкой с ограничением в 10000 символов
- (```bookid```) книга, на которую оставили отзыв, вторичный ключ, ссылается на таблицу ```books``` колонку ```id```.
  Должен быть уникальным(То есть одно описание на одну книгу)

### Отзыв(таблица```reviews```). Колонки

- (```id```)Идентификатор, должен быть первичным ключом, с автоинкрементом
- (```message```) Сообщение в отзыве, должна быть строкой с ограничением в 10000 символов
- (```userid```) пользователь, который оставил отзыв, вторичный ключ, ссылается на таблицу ```users``` колонку ```id```
- (```bookid```) книга, на которую оставили отзыв, вторичный ключ, ссылается на таблицу ```books``` колонку ```id```


