# cf-flux-schnell - Cloudflare Worker 调用 FLUX.1-schnell 模型

## 项目简介
本项目是基于 Cloudflare Workers 开发的 FLUX.1-schnell 文生图服务，核心功能是接收 `prompt` 等参数，调用 Cloudflare AI 模型生成图片，返回 Base64 格式结果（独立部署，不影响其他服务）。

## 已上传文件/文件夹说明
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

## 后续拉取项目后操作步骤（完整流程）
拉取项目后，无需额外配置，按以下步骤即可恢复开发、修改、重新部署：

### 1. 拉取项目源码
两种方式可选（选一种即可）：
#### 方式1：用 Git 拉取（推荐，需本地安装 Git）
打开终端，执行命令：
```bash
# 替换为你的 GitHub 仓库地址（已替换用户名）
git clone https://github.com/91276/cf-flux-schnell.git
#### 方式 2：直接下载压缩包
打开 GitHub 仓库页面（https://github.com/91276/cf-flux-schnell），点击右上角「Code」→「Download ZIP」；
解压下载的压缩包到本地任意文件夹。
### 2. 进入项目目录
终端执行命令，进入解压 / 拉取后的项目文件夹：
