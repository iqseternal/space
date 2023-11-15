
/**
 * 这个函数的意义为让 hotKeys 拥有编写的类型提示, 并且导出的时候能够具有编写时的运行时类型
 * 如果使用 const hotKeys: Record<string, ShortcutKey> = {}; 进行编写, 那么在使用时就不会拥有 hotKeys 的子项提示
 * @param hotkeys
 * @returns
 */
function makeHotKeys<
  T extends Record<string, ShortcutKey>,
  K extends string | number | symbol = keyof T
>(hotkeys: T): T & (Record<K, { allKey: Required<ShortcutKey>['allKey']; }>) {
  for (const key in hotkeys) {
    hotkeys[key].allKey = [hotkeys[key].key, ...(hotkeys[key].moreKey ?? [])].map(key => key.toLocaleLowerCase());
  }

  return hotkeys as any;
}

export const hotKeys = makeHotKeys({
  copy: {
    key: 'Ctrl+C',
    tip: '复制', changeAble: false
  },
  reload: {
    key: 'Ctrl+R', moreKey: ['F5'],
    tip: '刷新页面', changeAble: false
  },
  openDevTool: {
    key: 'Ctrl+Shift+I', moreKey: ['Command+Shift+I', 'F12'],
    tip: '打开开发者工具', changeAble: false,
    description: '会在生产模式的时候失效'
  },
  closeWindow: {
    key: 'Alt+F4',
    tip: '关闭窗口', changeAble: false
  },
  logout: {
    key: '',
    tip: '退出登录', changeAble: true
  }
})

