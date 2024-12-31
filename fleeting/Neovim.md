---
title: Neovim
aliases: 
categories: 
tags: 
created: 2024-12-30 09:33
updated: 2024-12-30 09:33
---
neovim 설치
`brew install neovim`

entrypoint file 생성
- neovim 이 시작될 때 실행되는 파일
`nvim init.lua`

config 폴더 내부 init.lua 파일 생성
`nvim lua/config/init.lua`

[lazy.vim](https://lazy.folke.io/) 설치
- plugin manager for Neovim

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local plugins = "plugins"
local opts = {}

require("lazy").setup(plugins, opts)
```

플러그인 설치
color scheme
- [gruvbox.nvim](https://github.com/ellisonleao/gruvbox.nvim)

```lua
return { 
    "ellisonleao/gruvbox.nvim", 
    priority = 1000,
    lazy = false,
    config = function()
        vim.cmd([[colorscheme gruvbox]])
    end,
}
```

[neotree](https://github.com/nvim-neo-tree/neo-tree.nvim)

```lua
return {
    "nvim-neo-tree/neo-tree.nvim",
    branch = "v3.x",
    dependencies = {
      "nvim-lua/plenary.nvim",
      "nvim-tree/nvim-web-devicons", -- not strictly required, but recommended
      "MunifTanjim/nui.nvim",
      -- "3rd/image.nvim", -- Optional image support in preview window: See `# Preview Mode` for more information
    }
}
```

[telescope](https://github.com/nvim-telescope/telescope.nvim)

```lua
return {
    'nvim-telescope/telescope.nvim', tag = '0.1.8',
-- or                              , branch = '0.1.x',
      dependencies = { 'nvim-lua/plenary.nvim' }
    }
```

---

keyMapper 생성

```lua
local keyMapper = function(from, to mode, opts)
	local options = { noremap = true, silent = false }
	mode = mode or "n"

	if opts then
		options = vim.tbl_extend("force", options, opts)
	end

	vim.keymap.set(mode, from, to, options)
end

return { mapKey = keyMapper }
```

config 파일 생성

```lua
vim.g.mapleader = " "  -- global leader
vim.g.maplocalleader = " " -- local leader
```

```lua
local mapKey = require("utils.keyMapper").mapKey

-- Neotree toggle
mapKey('<leader>e', ':Neotree toggle<CR>')

-- pane navigation 
mapKey('<C-h>', '<C-w>h') -- Left
mapKey('<C-j>', '<C-w>j') -- Down
mapKey('<C-k>', '<C-w>k') -- Up
mapKey('<C-l>', '<C-w>l') -- Right

-- clear search highlights 
mapKey('<leader>h', ':nohlsearch<CR>')
```

```lua
local opt = vim.opt

-- tab/indent
opt.tabstop = 2
opt.shiftwidth = 2
opt.softtabstop = 2
opt.expandtab = true
opt.smartindent = true
opt.wrap = false

-- Search
opt.incsearch = true
opt.ignorecase = true
opt.smartcase = true

-- visual 
opt.number = true
opt.relativenumber = true
opt.termguicolors = true
opt.signcolumn = "yes"

-- etc
opt.encoding = "UTF-8"
opt.cmdheight = 1
opt.scrolloff = 10
opt.mouse:append("a")
```

---
toggle neotree
- space + e
fuzzy finding
- space + ff
live grep
- space + fg

### Links

https://www.youtube.com/watch?v=u6S71cpMfw8
