const tab = document.querySelector(".tab");
const tab_li = document.querySelectorAll(".tab li");
const inputTxt = document.querySelector(".inputTxt");
const btn_add = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const list_footer = document.querySelector(".list_footer");

let data = [
  // {
  //     todoContent: "把冰箱發霉的檸檬拿去丟",
  //     checked: false,
  // },
  // {
  //     todoContent: "把冰箱發霉的檸檬拿去丟1",
  //     checked: false,
  // },
  // {
  //     todoContent: "把冰箱發霉的檸檬拿去丟2",
  //     checked: false,
  // },
];
let filteredData = [];

// 渲染頁面
const renderData = () => {
  let str = "";
  filteredData.forEach((item, index) => {
    str += `
                <li>
                    <label class="checkbox">
                        <input type="checkbox" class = "checkedItem" data-num = "${index}" ${
      item.checked ? "checked" : ""
    }/>
                        <span>${item.todoContent}</span>
                    </label>
                    <a href="#" class="delete" data-num = "${index}"></a>
                </li>
        `;
  });
  // 把資料組好渲染到頁面
  list.innerHTML = str;

  // 計算項目
  let list_footer_str = `
            <p>${data.length} 個待完成項目</p>
            <a href="#">清除已完成項目</a>`;
  list_footer.innerHTML = list_footer_str;
};
renderData();

// tab
tab.addEventListener("click", function (e) {
  // tab active
  tab.classList.add("pointer-cursor");
  // 先全部取消 active
  tab_li.forEach((item) => {
    item.classList.remove("active");
  });
  // 再在對應被點到的 tab 加上 active
  if (e.target.nodeName === "LI") {
    e.target.classList.add("active");
  }
  let currentTab = e.target.textContent;
  showTabData(currentTab);
});

// tab 切換資料顯示
// showTabData("全部"); // init
const showTabData = (currentTab) => {
  switch (currentTab) {
    case "待完成":
      filteredData = data.filter(function (item) {
        return item.checked === false;
      });
      break;

    case "已完成":
      filteredData = data.filter((item) => item.checked === true);
      break;

    case "全部":
      filteredData = data;
      break;
  }
  renderData();
};

// 新增
const addTodo = () => {
  let inputValue = inputTxt.value.trim();
  let obj = {};

  // if (inputValue){     // 一般 fun()
  //     obj.todoContent = inputValue;
  //     data.push(obj);
  //     renderData();
  //     inputTxt.value = "";
  // }

  // vvvv 用這種寫法 vvvv
  // 降低巢狀結構
  if (inputValue === "") {
    alert("請正確輸入內容");
    return;
  }
  obj.todoContent = inputValue;
  obj.checked = false;
  data.push(obj);
  let currentTab = document.querySelector(".tab .active").textContent;
  showTabData(currentTab);
  inputTxt.value = "";
};

btn_add.addEventListener("click", addTodo); // addTodo: 事件處理函數， click 事件觸發才會呼叫；addTodo() 會立即執行並返回傳遞結果 -> 把結果傳給 addEventListener
inputTxt.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});

// 更新狀態
list.addEventListener("click", (e) => {
  // 箭頭fun()
  let checkedItemIndex = e.target.getAttribute("data-num");

  // 更新
  if (e.target.getAttribute("class") === "checkedItem") {
    data[checkedItemIndex].checked = e.target.checked; // input[type="checkbox"] 有內建 boolean checked
    let currentTab = document.querySelector(".tab .active").textContent;
    showTabData(currentTab);
  }

  // 刪除
  else if (e.target.getAttribute("class") === "delete") {
    data.splice(checkedItemIndex, 1);
    let currentTab = document.querySelector(".tab .active").textContent;
    showTabData(currentTab);
  } else return;
});

// 清除已完成項目
list_footer.addEventListener("click", () => {
  data = data.filter((item) => !item.checked);
  let currentTab = document.querySelector(".tab .active").textContent; // 取得當前活躍的 tab 名稱
  showTabData(currentTab);
});
