/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => KrBookInfo
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/getBookInfo.ts
var import_obsidian = __toModule(require("obsidian"));
var titlePipeline = (title) => {
  return title.replace(/\(.*\)/gi, "").replace(/\[.*\]/gi, "").replace(":", "\uFF1A").replace("?", "\uFF1F").trim();
};
var getBookInfoResult = (_0) => __async(void 0, [_0], function* ({
  bookUrl,
  defaultTag,
  status,
  myRate,
  bookNote,
  toggleTitle,
  toggleIntroduction,
  toggleIndex
}) {
  var _a, _b, _c, _d, _e;
  bookUrl = encodeURI(bookUrl);
  try {
    const response = yield (0, import_obsidian.requestUrl)({
      url: `http://www.yes24.com` + bookUrl
    });
    const parser = new DOMParser();
    const html = parser.parseFromString(response.text, "text/html");
    const tags = [defaultTag && defaultTag];
    html.querySelectorAll("#infoset_goodsCate > div.infoSetCont_wrap > dl:nth-child(1) > dd > ul > li > a").forEach((value) => {
      tags.push(value.getText().replace(/(\s*)/g, ""));
    });
    const tag = [...new Set(tags)];
    const mainTitle = html.querySelector("#yDetailTopWrap > div.topColRgt > div.gd_infoTop > div > h2").getText();
    const subTitle = (_a = html.querySelector("#yDetailTopWrap > div.topColRgt > div.gd_infoTop > div > h3")) == null ? void 0 : _a.getText();
    const title = subTitle ? `${titlePipeline(mainTitle)}\uFF1A${titlePipeline(subTitle)}` : titlePipeline(mainTitle);
    const authors = [];
    html.querySelectorAll("#yDetailTopWrap > div.topColRgt > div.gd_infoTop > span.gd_pubArea > span.gd_auth > a").forEach((value) => {
      authors.push(value.getText().trim());
    });
    html.querySelectorAll("#yDetailTopWrap > div.topColRgt > div.gd_infoTop > span.gd_pubArea > span.gd_auth > span > span.moreAuthLi > span > ul > li > a").forEach((value) => {
      authors.push(value.getText().trim());
    });
    const author = [...new Set(authors)];
    const page = +html.querySelector("#infoset_specific > div.infoSetCont_wrap > div > table > tbody > tr:nth-child(2) > td").getText().split(" ")[0].slice(0, -1) || 0;
    const publishDate = html.querySelector("#yDetailTopWrap > div.topColRgt > div.gd_infoTop > span.gd_pubArea > span.gd_date").getText().split(" ").map((v) => v.slice(0, -1)).join("-");
    const coverUrl = ((_b = html.querySelector("#yDetailTopWrap > div.topColLft > div").querySelector("#yDetailTopWrap > div.topColLft > div > div.gd_3dGrp > div > span.gd_img > em > img")) == null ? void 0 : _b.getAttribute("src")) || ((_c = html.querySelector("#yDetailTopWrap > div.topColLft > div > span > em > img")) == null ? void 0 : _c.getAttribute("src")) || "";
    const introduction = (_d = html.querySelector("#infoset_introduce > div.infoSetCont_wrap > div.infoWrap_txt > div")) == null ? void 0 : _d.getText().replace(/(<br>|<br\/>|<br \/>)/g, "\r\n").replace(/(<b>|<B>|<\/b>|<\/B>|\[|\]|\*|\#)/g, "").split("\n").map((line) => line.trim() + "\n").join("");
    const index = (_e = html.querySelector("#infoset_toc > div.infoSetCont_wrap > div.infoWrap_txt")) == null ? void 0 : _e.getText().replace(/(<br>|<br\/>|<br \/>)/g, "\r\n").replace(/(<b>|<B>|<\/b>|<\/B>|\[|\]|\*|\#)/g, "").split("\n").map((line) => line.trim() + "\n").join("");
    const authorYaml = author.length === 1 ? `\n- ${author[0]}` : author.map(a => `- ${a}`).join('\n');
    
    const frontmatter = {
      cover_url: `${coverUrl}`,
      title: `${mainTitle}`,
      author: authorYaml,
      tag: `${tag.join(" ")}`,
      publish_date: `${publishDate}`,
      created: `${new Date(+new Date() + 3240 * 1e4).toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].slice(0, 5)}`,
      read_date: `${new Date(+new Date() + 3240 * 1e4).toISOString().split("T")[0]}`,
      total_page: page,
      status: `unread`,
      rate: ``,
      format: ``
    };

    const yamlString = (0, import_obsidian.stringifyYaml)(frontmatter);
    const lines = yamlString.split('\n');
    const cleanedLines = lines.map(line => {
      if (line.trim().startsWith('author: |-')) {
        return line.replace('author: |-', 'author:');
      }
      return line;
    });
    const cleanedYaml = cleanedLines.join('\n');


const main = `---
${cleanedYaml}---
${toggleTitle ? `
# ${title}` : ""}${toggleIntroduction ? `

## \uCC45\uC18C\uAC1C
${introduction}` : ""}${toggleIndex ? `

## \uBAA9\uCC28
${index}` : ""}`;
    return {
      ok: true,
      book: {
        title: title.replace("\uFF1A", " ").replace("\uFF1F", "").replace("/", "\uFF0F").replace(/\s{2,}/gi, " "),
        main
      }
    };
  } catch (err) {
    return {
      ok: false
    };
  }
});

// src/searchUrl.ts
var import_obsidian2 = __toModule(require("obsidian"));
var searchBookUrl = (bookName) => __async(void 0, null, function* () {
  bookName = encodeURI(bookName);
  try {
    const response = yield (0, import_obsidian2.requestUrl)({
      url: "http://www.yes24.com/Product/Search?domain=BOOK&query=" + bookName
    });
    const parser = new DOMParser();
    const html = parser.parseFromString(response.text, "text/html");
    const bookUrl = html.querySelector("#yesSchList > li:nth-child(1) > div > div.item_info > div.info_row.info_name > a.gd_name").getAttribute("href");
    return { ok: true, url: bookUrl };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
});
var totalSearchBookUrl = (bookName) => __async(void 0, null, function* () {
  bookName = encodeURI(bookName);
  try {
    const response = yield (0, import_obsidian2.requestUrl)({
      url: "http://www.yes24.com/Product/Search?domain=ALL&query=" + bookName
    });
    const parser = new DOMParser();
    const html = parser.parseFromString(response.text, "text/html");
    const bookUrl = html.querySelector("#yesSchList > li:nth-child(1) > div > div.item_info > div.info_row.info_name > a.gd_name").getAttribute("href");
    return { ok: true, url: bookUrl };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
});
var getBookUrl = (bookName) => __async(void 0, null, function* () {
  const searchBookResult = yield searchBookUrl(bookName);
  if (searchBookResult.ok) {
    return searchBookResult;
  }
  const searchTotalBookResult = yield totalSearchBookUrl(bookName);
  if (searchTotalBookResult.ok) {
    return searchTotalBookResult;
  }
  return { ok: false };
});

// src/getBook.ts
var getBook = (_0) => __async(void 0, [_0], function* ({
  bookname,
  defaultTag,
  status,
  myRate,
  bookNote,
  toggleTitle,
  toggleIntroduction,
  toggleIndex
}) {
  const bookUrlResult = yield getBookUrl(bookname);
  if (!bookUrlResult.ok) {
    return { ok: false, error: `${bookname} url not found` };
  }
  const bookInfoResult = yield getBookInfoResult({
    bookUrl: bookUrlResult.url,
    defaultTag,
    status,
    myRate,
    bookNote,
    toggleTitle,
    toggleIntroduction,
    toggleIndex
  });
  if (!bookInfoResult.ok) {
    return { ok: false, error: "Get book info error occured" };
  }
  return { ok: true, book: bookInfoResult.book };
});

// main.ts
var DEFAULT_SETTINGS = {
  statusSetting: "\u{1F7E9} \uC644\uB8CC",
  myRateSetting: "0",
  bookNoteSetting: "\u274C",
  defaultTag: "\u{1F4DA}\uB3C5\uC11C",
  toggleTitle: true,
  toggleIntroduction: false,
  toggleIndex: false
};
var KrBookInfo = class extends import_obsidian3.Plugin {
  addBookInfoToActiveFile() {
    return __async(this, null, function* () {
      const file = this.app.workspace.getActiveFile();
      if (file.extension !== "md") {
        new import_obsidian3.Notice("This file is not md file, Please open md file");
        return;
      }
      if (!file) {
        new import_obsidian3.Notice("There's no active file, Please open new file");
        return;
      }
      new import_obsidian3.Notice("Loading...");
      const {
        ok,
        book: { title, main },
        error
      } = yield getBook({
        bookname: file.basename,
        defaultTag: this.settings.defaultTag,
        status: this.settings.statusSetting,
        myRate: this.settings.myRateSetting,
        bookNote: this.settings.bookNoteSetting,
        toggleTitle: this.settings.toggleTitle,
        toggleIntroduction: this.settings.toggleIntroduction,
        toggleIndex: this.settings.toggleIndex
      });
      if (!ok) {
        new import_obsidian3.Notice(error);
        return;
      }
      const text = yield this.app.vault.read(file);
      this.app.vault.modify(file, main + "\n\n" + text);
      const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
      const fileName = title.replace(regExp, "");
      this.app.fileManager.renameFile(this.app.vault.getAbstractFileByPath(file.path), file.parent.path + "/" + fileName + ".md");
      new import_obsidian3.Notice(`Success!`);
      return;
    });
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addCommand({
        id: "add-book-info",
        name: "Add Book Info",
        icon: "lines-of-text",
        callback: () => __async(this, null, function* () {
          yield this.addBookInfoToActiveFile();
        })
      });
      this.addRibbonIcon("lines-of-text", "Add Book Info", (evt) => __async(this, null, function* () {
        yield this.addBookInfoToActiveFile();
      }));
      this.addSettingTab(new KrBookInfoSettingTab(this.app, this));
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  onunload() {
  }
};
var KrBookInfoSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Default Setting" });
    new import_obsidian3.Setting(containerEl).setName("Tag").setDesc("Set default tag value").addText((text) => text.setPlaceholder("Enter your default tag").setValue(this.plugin.settings.defaultTag).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.defaultTag = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("Status").setDesc("Set status default value").addText((text) => text.setPlaceholder("Enter your status").setValue(this.plugin.settings.statusSetting).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.statusSetting = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("My Rate").setDesc("Set my_rate default value").addText((text) => text.setPlaceholder("Enter your status").setValue(this.plugin.settings.myRateSetting).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.myRateSetting = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("Book Note").setDesc("Set book_note default value").addText((text) => text.setPlaceholder("Enter your status").setValue(this.plugin.settings.bookNoteSetting).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.bookNoteSetting = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("Toggle Title").setDesc("Add title on main text or not").addToggle((toggle) => toggle.setValue(this.plugin.settings.toggleTitle).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.toggleTitle = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("Toggle Introduction").setDesc("Add introduction on main text or not").addToggle((toggle) => toggle.setValue(this.plugin.settings.toggleIntroduction).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.toggleIntroduction = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian3.Setting(containerEl).setName("Toggle Index").setDesc("Add index on main text or not").addToggle((toggle) => toggle.setValue(this.plugin.settings.toggleIndex).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.toggleIndex = value;
      yield this.plugin.saveSettings();
    })));
  }
};