<div align="center">
  <h1>js使用场景</h1>
  <p>在使用场景中使用js，不同场景使用最佳的解决方式会更佳。</p>
</div>

## 目录

- [目录](#目录)
- [场景](#场景)
  - [01.Map,Object 数据类型相互转换](#01mapobject-数据类型相互转换)
  - [02.js 对象解构赋值重命名设置默认值](#02js-对象解构赋值重命名设置默认值)
- [参考链接](#参考链接)

## 场景

### 01.Map,Object 数据类型相互转换

下面先说明两个方法

- Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
- Object.fromEntries()方法是 Object.entries()的逆操作，用于将一个键值对数组转为对象。

**Object => Map**

```js
let obj = {
  name: "foo",
  age: 20,
};
let map = new Map(Object.entries(obj));
map.get("name"); // 'foo'
```

**Map => Object**

```js
let map = new Map([
  ["name", "foo"],
  ["age", 20],
]);
let obj = Object.fromEntries(map.entries());
obj.name; // "foo";
```

### 02.js 对象解构赋值重命名设置默认值

```js
const temp = {
  a: "foo",
  b: 20,
  sex: true,
};

const { a: name, b: age, sex = "default" } = temp;

// name
```

## 参考链接
