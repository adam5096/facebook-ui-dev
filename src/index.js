// ----------------- panel 相關 -----------------

// icon DOM 們
const plusBtn = document.getElementById("plus-btn")
const msgBtn = document.getElementById("msg-btn")
const notificationBtn = document.getElementById("notification-btn")
const moreBtn = document.getElementById("more-btn")

// 選單 DOM 們
const plusPanel = document.getElementById("plus-panel")
const msgPanel = document.getElementById("msg-panel")
const notificationPanel = document.getElementById("notification-panel")
const morePanel = document.getElementById("more-panel")

// panel DOM arr 用來執行打開選單邏輯
const panelArr = [plusPanel, msgPanel, notificationPanel, morePanel]

// 1. index === idx
// 比對傳入值 index 與當前成員索引值 idx, 如果吻合, 將當前成員 p 的 hidden 樣式移除, 使畫面出現選單

// 2. p.classList.contains('hidden')
// 當前 p 處在 hidden 時, 不做處理, 直接離開當前 if, 處理下個 arr成員

// 3. p.classList.add('hidden')
// 將不合上述兩種條件的成員都加上 hidden
function openPanel(index) {
    panelArr.forEach((p, idx) => {
        if (index === idx) {
            p.classList.remove("hidden")
            return
        }
        if (p.classList.contains("hidden")) {
            return
        }
        p.classList.add("hidden")
    })
}

// 關閉選單邏輯
window.addEventListener("click", function () {
    openPanel(-1)
    // console.log('window');
})

// event.stopPropagation() 停止事件向父層冒泡
// 如出HTML 祖先+後代 結構, 預設會有事件傳遞鏈, 而這裡的 window DOM與選單 DOM 剛好吻合此結構
// 我們希望 icon DOM, 選單 DOM 內的點擊事件不被 windows聽到, 所以用此 stopPropagation 函數來切割事件傳遞鏈
plusBtn.addEventListener("click", function (event) {
    event.stopPropagation()
    openPanel(0)
})
msgBtn.addEventListener("click", function (event) {
    event.stopPropagation()
    openPanel(1)
})
notificationBtn.addEventListener("click", function (event) {
    event.stopPropagation()
    openPanel(2)
})
moreBtn.addEventListener("click", function (event) {
    event.stopPropagation()
    openPanel(3)
})

// ----------------- 左側資訊欄 相關 -----------------

// 取得 left-block DOM
const leftBlock = document.getElementById("left-block")

function renderLeftItem(name, imgUrl) {
    let item = `
    <div
        class="flex items-center justify-items-center w-full p-2 mb-1 rounded hover:bg-fb-input cursor-pointer"
    >
        <div class="w-[32px] overflow-hidden rounded-full mr-4">
            <img
                src="${imgUrl}"
                alt="avatar"
            />
        </div>
        <p class="text-white text-[.9rem]">${name}</p>
    </div>
`
    return item
}

// https://bruce-fe-fb.web.app/image/avator.png
// https://bruce-fe-fb.web.app/image/left/activity.svg

function renderLeftBlock() {
    // 渲染資料陣列(name 與 imgUrl), 工作中資料來源可能是發送API後取回
    const leftArr = [
        {
            name: "Adam",
            img: "https://bruce-fe-fb.web.app/image/avator.png",
        },
        {
            name: "活動",
            img: "https://bruce-fe-fb.web.app/image/left/activity.svg",
        },
        {
            name: "天氣",
            img: "https://bruce-fe-fb.web.app/image/left/cloudy.png",
        },
        {
            name: "災害應變中心",
            img: "https://bruce-fe-fb.web.app/image/left/dynamic.svg",
        },
        {
            name: "新冠病毒資訊中心",
            img: "https://bruce-fe-fb.web.app/image/left/facemask.svg",
        },
        {
            name: "社團",
            img: "https://bruce-fe-fb.web.app/image/left/friend.svg",
        },
        {
            name: "企業管理平台",
            img: "https://bruce-fe-fb.web.app/image/left/job.png",
        },
        {
            name: "Messenger",
            img: "https://bruce-fe-fb.web.app/image/left/messenger.svg",
        },
        {
            name: "近期廣告動態",
            img: "https://bruce-fe-fb.web.app/image/left/pay.png",
        },
        {
            name: "朋友名單",
            img: "https://bruce-fe-fb.web.app/image/left/sale.png",
        },
        {
            name: "最愛",
            img: "https://bruce-fe-fb.web.app/image/left/star.svg",
        },
        {
            name: "Marketplace",
            img: "https://bruce-fe-fb.web.app/image/left/store.svg",
        },
        {
            name: "Watch",
            img: "https://bruce-fe-fb.web.app/image/left/watchingTv.svg",
        },
    ]
    // 準備一個中間加工容器
    let htmlStr = ""
    // 循環拼裝結構進入到容器中
    // for (let i = 0; i < 9; i++) {
    //     htmlStr += renderLeftItem(

    //     )
    // }
    leftArr.forEach((obj) => {
        htmlStr += renderLeftItem(obj.name, obj.img)
    })
    // 最後一步, 把完成品渲染到畫面上
    leftBlock.innerHTML = htmlStr
}

renderLeftBlock()

// ----------------- 右側資訊欄 相關 -----------------

const rightBlock = document.getElementById("right-block")

// 將操作包成函數, 將用途相近的變數作用域, 與其他不同功能的變數作用域做出隔離
function renderRightBlock() {
    const rightItem = `
    <div
        class="flex items-center justify-items-center w-full py-2 px-1 rounded hover:bg-fb-input cursor-pointer"
    >
        <div class="w-[45px]">
            <div class="relative w-[32px] cursor-pointer">
                <!-- avatar -->
                <div class="overflow-hidden rounded-full">
                    <img
                        src="https://bruce-fe-fb.web.app/image/avator.png"
                        alt="avatar"
                    />
                </div>
                <div
                    class="w-[8px] h-[8px] rounded-full bg-green-500 absolute bottom-0 right-0 ring-gray-900 ring"
                ></div>
            </div>
        </div>
        <p class="text-white text-[.9rem]">Adam</p>
    </div>
`
    // 以 <p class="mb-2 text-lg text-gray-400">聯絡人</p> 作為 htmlStr 的起始內容
    // 接著從 htmlStr 的尾部依序推入其他內容
    // 因為 htmlStr 接受重新賦值, 故使用 let 宣告
    let htmlStr = `<p class="mb-2 text-lg text-gray-400">聯絡人</p>`

    for (let i = 0; i < 10; i++) {
        htmlStr += rightItem
    }

    rightBlock.innerHTML = htmlStr
}

renderRightBlock()

// ----------------- 限時動態 相關 -----------------

const storyList = document.getElementById("story-list")

function renderStoryItem() {
    for (let i = 0; i < 8; i++) {
        const divBox = document.createElement("div")
        divBox.classList.add(
            "flex-1",
            "px-[4px]",
            "min-w-[120px]",
            "cursor-pointer",
        )

        divBox.innerHTML = `
            <div class="relative overflow-hidden" id="${i}">
                <div id="story-mask-${i}" class="hidden absolute w-full h-full top-0 left-0 bg-black/20"></div>
                <div
                    class="w-[32px] h-[32px] absolute top-4 left-4 ring-4 ring-fb bg-fb-card rounded-full flex justify-center items-center z-10"
                >
                    <p class="text-white text-sm">當</p>
                </div>
                <div
                    class="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/30 to-transparent z-20"
                ></div>
                <img
                    id="story-img-${i}"
                    class="w-full h-full duration-500 hover:scale-105"
                    src="https://bruce-fe-fb.web.app/image/story.png"
                    alt="story"
                />
                <p
                    class="absolute bottom-2 left-2 text-white z-10"
                >
                    Adam
                </p>
            </div>
    `
        divBox.addEventListener("mouseover", function () {
            const mask = document.getElementById(`story-mask-${i}`)
            const img = document.getElementById(`story-img-${i}`)
            mask.classList.remove("hidden")
            img.classList.add("scale-105")
        })
        divBox.addEventListener("mouseout", function () {
            const mask = document.getElementById(`story-mask-${i}`)
            const img = document.getElementById(`story-img-${i}`)
            mask.classList.add("hidden")
            img.classList.remove("scale-105")
        })

        storyList.appendChild(divBox)
    }
}

renderStoryItem()

// ----------------- 輪播 相關 -----------------

function renderLiveItem() {
    // 1. 取得 DOM: swiper-wrapper-live
    const swiperWrapperLive = document.getElementById("swiper-wrapper-live")

    // 重複加工 20 次
    for (let i = 0; i < 20; i++) {
        // 2. 準備一個容器 <div class="swiper-slide">
        const divBox = document.createElement("div")
        divBox.classList.add("swiper-slide")

        // 3. 這是要自動生成的內容
        const item = `
        <div class="w-[55px]">
            <div
                class="relative w-[40px] cursor-pointer"
            >
                <div
                    class="overflow-hidden rounded-full"
                >
                    <img
                        src="https://bruce-fe-fb.web.app/image/avator.png"
                        alt="avatar"
                    />
                </div>
                <div
                    class="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-0 right-0 ring-gray-900 ring"
                ></div>
            </div>
        </div>
        `
        // 4. item 加入 divBox
        divBox.innerHTML = item
        // 5. divBox 追加入 swiperWrapperLive DOM
        swiperWrapperLive.appendChild(divBox)
    }

    new Swiper(".fb-live", {
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: "auto",
    })
}

renderLiveItem()
