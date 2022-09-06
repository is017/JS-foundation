class Tabs {
    constructor(select, type) {
        var container = document.querySelector(select)
        this.oHeaderItems = container.querySelectorAll(".header li")
        this.oBoxItems = container.querySelectorAll(".box li")

        // console.log(this.oHeaderItems,this.oBoxItem
        this.type = type
        this.change()
    }

    change() {
        for (let i = 0; i < this.oHeaderItems.length; i++) {
            // 自定义属性
            this.oHeaderItems[i].addEventListener(this.type, () => {
                // console.log(this)
                var index = i
                for (var m = 0; m < this.oHeaderItems.length; m++) {
                    this.oHeaderItems[m].classList.remove("active")
                    this.oBoxItems[m].classList.remove("active")
                }

                this.oHeaderItems[index].classList.add("active")
                this.oBoxItems[index].classList.add("active")
            })
        }
    }
}

export default Tabs