---
sidebar: auto
search: true
tags:
  - algo
---

# 算法12322233

## 基本配置23

### base

- 类型: `string123`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会自动地作为前缀插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

**参考:**

- [Base URL](../guide/assets.md#基础路径)
- [部署指南 > Github Pages](../guide/deploy.md#github-pages)

### title

- 类型: `string`
- 默认值: `undefined`
