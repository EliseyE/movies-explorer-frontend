
# Дипломный Проект (Frontend): Movies explorer

![Проект: Movies explorer (Frontend)](./readme.png)

## Ссылки на проект

[Ссылка на сгенерированный макет Figma](https://disk.yandex.ru/d/iBVz7G8mYfpYcg/ "Ссылка на сгенерированный макет Figma")

[Репозиторий backend части дипломной проектной](https://github.com/EliseyE/movies-explorer-api/ "Репозиторий backend части дипломной проектной")

Backend https://api.mexp.nomoredomains.rocks

Frontend https://mexp.nomoredomains.rocks

[Пул реквест frontend части дипломной проектной](https://github.com/EliseyE/movies-explorer-frontend/pull/2 "Пул реквест frontend части дипломной проектной")

#

## О проекте

Перед вами frontend приложения - вторая часть дипломной работы студента Яндекс Практикум курса Веб-разработчик. Разработка frontend состоит из двух этапов:
* Вёрстка
* Функциональная часть (текущий этап)

Приложение даёт возможность искать и сохранять в своём профиле понравившиеся фильмы, размещенные в сервисе beatfilm-movies.

#

## Роуты

`/signup` - Регистарация

`/signin` - Вход

`/movies` - Фильмы

`/saved-movies` - Сохраненные фильмы

`/saved-movies` - Сохраненные фильмы

`/profile` - Профиль

## Директории

`/components` — папка с компонентами

`/contexts` — папка с файлами контектов

`/images` — папка с картинками

`/utils` — папка с файлами вспомогательных частей программы

`/vendor` — папка с файлами сторонних разработчиков (шрифты, нормализация)

`appConfig` - файл настройки приложения

`generateComponent.sh` - bash скрипт позволяет генерировать компонент в составе js и css файлов

## Технологии
Языки разметки и программирования: HTML, CSS, JavaScript, JSX

  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Функциональность
Приложение включает в себя страницы:
* Главная - о студенте;
* Фильмы - поиск по сервису beatfilm-movies;
* Сохранненные фильмы;
* Профиль и его редактирование. Возможно редактирование данных;
* Регистарция;
* Вход.

Функции:
* Регистрация, авторизация, редактирование данных пользователя.
* Поиск по фильмов по ключевых словам и фильтру, сохранение фильмов.
* Валидация и сообщения об ошибках в формах - браузерная и кастомная валидация по RegExp. Несколько уровней валидации: подсказка и указание на ошибку.
* Защита роутов.
* Пагинация контента - разделение контента на порции и постепенная подгрузка по нажатию на кнопку "Ещё".
* Запросы к API их обработка.


## Планы
Продолжить разработку приложения: клиентская часть (frontend):
1. Рефакторинг кода - Выявление и создание общих компонентов, DRY.
2. Вёрстка: ревизия.
3. Оптимизация компонента App.
4. Подключить изменяемые переенные через appConfig.

last upd 25/06/2023
