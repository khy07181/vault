let mapleader=" "

set clipboard=unnamed
set easymotion

"Move to the end of the sentence.
noremap B ^
noremap H ^

noremap E $
noremap L $

" Remap 'd' command to always use the '_ (black hole) register
nnoremap d "_d
vnoremap d "_d

" Ensure 'dd', 'dw', and 'D' also use the black hole register
nnoremap dd "_dd
nnoremap dw "_dw
nnoremap D "_D

" Remap 'c' command to always use the '_ (black hole) register
nnoremap c "_c
vnoremap c "_c
nnoremap cc "_cc
nnoremap cw "_cw
nnoremap C "_C
