var groups = []
var flags = 0

function setFlag(){
  flags++
  if(flags==4)
          init()
}

function loadAndInit(){
  $.ajax({
    type: 'get',
    url: '/api/getPlacesBy',
    data : {
      category : "Парки"
    },
    success : (data) => {

      groups.push({
        name: "Парки",
        style : "islands#greenIcon",
        items : data
      })

      setFlag()

    }
  })

  $.ajax({
    type: 'get',
    url: '/api/getPlacesBy',
    data : {
      category : "Секретные места"
    },
    success : (data) => {

      groups.push({
        name: "Секретные места",
        style : "islands#grayIcon",
        items : data
      })

    setFlag() 

    }
  })


  $.ajax({
    type: 'get',
    url: '/api/getPlacesBy',
    data : {
      category : "Культурные достопримечательности"
    },
    success : (data) => {

      groups.push({
        name: "Культурные достопримечательности",
        style : "islands#blueIcon",
        items : data
      })

      setFlag()

    }
  })

  $.ajax({
    type: 'get',
    url: '/api/getPlacesBy',
    data : {
      category : "Атмосферные заведения"
    },
    success : (data) => {

      groups.push({
        name: "Атмосферные заведения",
        style : "islands#redIcon",
        items : data
      })

      setFlag()

    }
  })




}

ymaps.ready(loadAndInit);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [50.443705, 30.530946],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        }),
        // Контейнер для меню.
        menu = $('<ul class="menu"/>');

    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        // Пункт меню.
        var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
        // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
        // Контейнер для подменю.
            submenu = $('<ul class="submenu"/>');

        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
        menuItem
            .append(submenu)
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            .find('a')
            .bind('click', function () {
                if (collection.getParent()) {
                    myMap.geoObjects.remove(collection);
                    submenu.hide();
                } else {
                    myMap.geoObjects.add(collection);
                    submenu.show();
                }
            });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.center, { balloonContentHeader: item.name, balloonContentBody : item.description });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });
    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('.kekmenu'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
}
