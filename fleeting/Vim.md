### Vim 파일

`i` - insert mode
`vim filename` - 열기
`:q` - 종료
`:wq` 저장 후 종료
`:q!` - 변경 사항 무시 후 종료

### 이동

| h   | j   | k   | l   |
| --- | --- | --- | --- |
|  ⬅️  | ⬇️ |    ⬆️ | ➡️  |

`h` - ⬅️
`j` - ⬇️
`k` - ⬆️
`l` - ➡️
`w` - 단어 이동(첫 글자)
`e` - 단어 이동(마지막 글자)
`b` - 이전 단어의 시작으로 이동
`ge` - 이전 단어의 끝으로 이동
`0` - 줄의 시작으로 이동
`$` - 줄의 끝으로 이동
`{` - 이전 단락으로 이동
`}` - 다음 단락으로 이동
`gg` - 파일 처음으로 이동
`G` - 파일 끝으로 이동
`7G` - 7번째 줄로 이동
`CTRL-G` 파일 내 현재 위치와 파일의 상태 확인

## 편집

### delete

`x` - 한 글자 지우기
`de` - 커서를 시작으로 한 단어 지우기(공백 미포함)
`dw` - 커서를 시작으로 한 단어 지우기(공백 포함)
`diw` - 커서 상관 없이 현재 단어 지우기
`dd` - 한 줄 지우기
`d$` - 커서로부터 한 줄 지우기
`di(` - 괄호 안의 텍스트 제거
`da(` - 괄호 포함 텍스트 제거

### 추가

a - 단어 끝부터 입력 추가(insert mode)
A - 줄 끝부터 입력 추가(insert mode)

### 새 줄 열기

`o` - 아래로 새 줄 열기(insert mode)
`O` - 위로 새 줄 열기(insert mode)

### 반복

- 대상 이전에 숫자를 입력하면 숫자만큼 반복된다.

`2w` - 두 단어 이동
`2dw`, `d2w` - 두 단어 삭제

### Undo

`u` - 마지막 명령 취소
`U` - 한 줄 명령 취소
`CRTL-R` - 취소한 것을 다시 실행

### 복사

`y`
`y$` - 커서부터 줄 끝까지 복사
`yiw` - 현재 단어 복사
`yy` - 한 줄 복사

### 붙여넣기

`p` - buffer에 있는 마지막 내용을 뒤에 붙인다.

### 선택 영역 복사/붙여넣기

`v`로 원하는 영역 선택 후 `y`로 복사, `p`로 붙여넣기

### replace

`r` - 글자 치환
`R` - 커서로 부터 치환하면서 다음으로 이동
`:s/old/new/` - old -> new 로 단어 치환
`:s/old/new/g` - 줄에서 old -> new 로 모두 치환

### change

`ce`, `cw` - 한 단어 변경

### 찾기

`/` - /word 입력
- `n` - 계속 찾기
- `shift-n` - 반대 방향으로 찾기
- `CTRL-O` - 되돌아가기
- `CTRL-I` - 다시 뒤로 돌아가기

`%` - 괄호의 짝 찾기

### 옵션 설정

`:set COMMAND`
- `:set ic` - 대소문자 구별 안함, ignore case
- `:set hls is` - highlight
- `:set noic`, `noh` - highlight 끄기

### 외부 명령 실행하기

`:!` 을 입력한 후 실행하려는 명령을 입력하면 외부 명령을 실행할 수 있다.
ex) `:! ls`

### 파일 저장

`:w FILENAME`

## surround.vim

### 감싸기(surround)

- `ys`
삭제(delete)
- `ds`
바꾸기(change)
- `cs`

한 단어 감싸기
- `ysiw` + 괄호
	- `ysiw(`
	- `ysiw)`
	- `ysiwB`
	- `ysiwb`

### Links

[au VimEnter * call Bye2023()](https://au-vimenter.github.io/post/2023-12-23-au-vimenter/)
[How I Setup Neovim To Make It AMAZING in 2024: The Ultimate Guide](https://www.youtube.com/watch?v=6pAG3BHurdM)
