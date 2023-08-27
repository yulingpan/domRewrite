const div = dom.create("<div>newDiv</div>");
console.log(div);

dom.after(test, div);

const div3 = dom.create('<div id="parent">parent</div>');
dom.wrap(test, div3);
console.log(div3);

// div3默认存在于js线程中，把它增加到body子节点中显示在页面上
dom.append(document.body, div3);

// dom.remove(div);

const emptyChilds = dom.empty(window.empty);
console.log(emptyChilds);

dom.attr(test, "title", "newTitle");
const readTitle = dom.attr(test, "title");
console.log(`title: ${readTitle}`);

dom.text(test, "Hi,I am new text!");
const readText = dom.text(test);
console.log(`text: ${readText}`);

dom.html(div, "<p>newHTML</p>");
const readHtml = dom.html(div);
console.log(`Html: ${readHtml}`);

dom.style(test, "border", "1px solid red");
dom.style(test, { border: "1px solid grey", color: "#98F5FF" });
const readStyle = dom.style(test, "border");
console.log(`readStyle: ${readStyle}`);

dom.class.add(div, "red");
dom.class.remove(div, "red");
const hasClass = dom.class.has(div, "red");
console.log(`hasClass: ${hasClass}`);

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv2 = dom.find("#test2")[0];
console.log(testDiv2);
console.log(dom.find(".red", testDiv2)[0]);

console.log(dom.parent(test));

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "red"));

console.log(dom.index(s2));
