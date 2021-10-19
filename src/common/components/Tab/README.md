### Tabs / Tab

```js
  import { Tabs, Tab } from "@src/common/components/Tab";

  <Tabs onChange={onChange} value={value}>
    <Tab name={name} label={label}></Tab>
  <Tabs>
```

```js
Tabs:
    value     当前激活 tab 面板 value
    onChange  切换面板的回调
Tab:
    name      切换对应的 value
    label     选项卡显示文字
```
