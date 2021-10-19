### List / ListItem

```js
  import { List, ListItem } from "@src/common/components/List";

  <List loading={false}>
    <ListItem selected={false} disabled={false}></ListItem>
  <List>
```

```js
List:
    loading   未显示数据时 默认显示骨架屏
ListItem:
    selected  当前高亮 item
    disabled  禁用 item
```
