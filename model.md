Модели
======


## JSON формат

Конвертация `*.obj` в `*.json`: https://github.com/mrdoob/three.js/tree/dev/utils/converters


### Формат

```json
{
  "metadata": {},
  "object": {
    "uuid": "OBJECT_UUID",
    "type": "Group",
    "matrix": [...],
    "children": [...],
  },
  "geometries": [...],
  "materials": [
    {"uuid": "MATERIAL_UUID", "map": "TEXTURE_UUID", type: "...", "name": "..."},
    ...
  ],
  "textures": [
    {"uuid": "TEXTURE_UUID", image: "IMAGE_UUID"},
    ...
  ],
  "images": [
    {"uuid": "IMAGE_UUID", "url": "..."},
    ...
  ],
  "animations": [],
}
```


### Пример загрузки

```js
const loader = new THREE.ObjectLoader();
```
