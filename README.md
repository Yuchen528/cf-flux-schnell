# cf-flux-schnell - Cloudflare Worker 调用 FLUX.1-schnell 模型

## 项目简介
本项目是基于 Cloudflare Workers 开发的 FLUX.1-schnell 文生图服务，核心功能是接收 `prompt` 等参数，调用 Cloudflare AI 模型生成图片，返回 Base64 格式结果（独立部署，不影响其他服务）。

## 文件夹说明
| 文件/文件夹          | 作用说明                                                                 |
|----------------------|--------------------------------------------------------------------------|
| `src/`               | 核心代码目录，存放模型调用逻辑                                           |
| `src/index.ts`       | 主函数文件：接收 POST 请求、校验参数、调用 FLUX.1-schnell 模型、返回 Base64 结果 |
| `.gitignore`         | Git 忽略配置文件：指定无需上传的文件（如 `node_modules`、`.wrangler` 缓存等） |
| `package.json`       | 项目依赖配置文件：记录项目名称、依赖包（如 Cloudflare Workers 相关依赖）、脚本命令 |
| `pnpm-lock.yaml`     | 依赖版本锁定文件：确保每次安装的依赖版本一致，避免兼容性问题               |
| `tsconfig.json`      | TypeScript 编译配置文件：定义代码语法检查、编译规则等                     |
| `wrangler.jsonc`     | Cloudflare Workers 部署配置文件：绑定 AI 服务、指定兼容性日期等核心配置   |
| `worker-configuration.d.ts` | TypeScript 类型声明文件：为 Worker 环境变量（如 AI 绑定）提供类型提示     |

## 后续拉取项目后操作步骤
拉取项目后，无需额外配置，按以下步骤即可恢复开发、修改、重新部署：

### 1. 拉取项目源码
两种方式可选（选一种即可）：

#### 方式一：Git 拉取（推荐）**

```bash
git clone https://github.com/91276/cf-flux-schnell.git
```

#### 方式二：直接下载压缩包

打开 GitHub 仓库页面（https://github.com/91276/cf-flux-schnell）
点击右上角「Code」→「Download ZIP」；
解压下载的压缩包到本地任意文件夹。

### 2. 进入项目目录

终端执行命令，进入解压 / 拉取后的项目文件夹：

```bash
cd cf-flux-schnell  # 文件夹名称与仓库名一致
```

### 3. 安装依赖（恢复 node_modules）

项目依赖已记录在 package.json 和 pnpm-lock.yaml 中，终端执行：

```bash
# 若未安装 pnpm，先执行 npm install -g pnpm 安装
pnpm install
```

执行完成后，会自动生成 node_modules 文件夹，项目依赖恢复完成。


### 4. 本地测试（可选，提前排错）

启动本地开发服务器，测试模型调用逻辑：

```bash
npx wrangler dev
```

启动成功后，终端会输出本地测试 URL（如 http://localhost:8787）
可通过Postman 发送 POST 请求测试：
 
```json
{
  "prompt": "cyberpunk cat, neon lights",
  "steps": 4
}
```

### 5. 修改代码（如需）

根据需求修改 src/index.ts（如调整模型参数、响应格式等），修改后重复步骤 4 验证效果。

### 6. 重新部署到 Cloudflare

本地测试无问题后，更新线上服务：

```bash
npx wrangler deploy
```

部署成功后，终端会输出线上服务 URL（如 https://cf-flux-schnell-xxx.workers.dev），可直接用于调用。


## 线上服务调用说明
请求方式：POST

请求 URL：部署后的 Cloudflare Worker 地址

请求体（JSON 格式）

```json
{
  "prompt": "你的文生图提示词（必填）",
  "steps": 4  // 可选，扩散步数（1-8，默认 4）
}
```

返回结果：JSON 格式，包含 imageBase64 字段（Base64 编码的图片数据）


## 注意事项
无需上传 node_modules、.wrangler 等文件夹，pnpm install 可一键恢复；

若需修改线上服务，必须先修改本地代码，再执行 npx wrangler deploy 重新部署；

查看线上服务日志 / 状态：登录 Cloudflare 控制台 →「Compute」→「Workers & Pages」→ 对应项目；


