Vue.component('CatAndDog', {
    props:['animalType','animals','currentPage'],
    // 變數資料是由父層傳子層接收 所以需要給變數
    data(){
        return{
            
            imgURL:'./images/Meteor/',
            
        }
    },
    computed: {
        // 這邊做篩選
        filterAnimals() {
            if(!this.animalType){
                // return this.animals;
                let _animals = [];
                //給一個新的陣列 選取切割123,456,789 每頁三筆去做顯示的資料
                _animals = this.animals.slice((this.currentPage-1)*3, (this.currentPage-1)*3+3);
                return _animals;
            }
            let _animals = this.animals.filter((animal) => {
                //filter 篩選pkind值要=變數
                return animal.pkind  === this.animalType;
               })
            
            _animals = _animals.slice(this.currentPage-1,this.currentPage*3);
            return _animals;
            }
    },

    template: `
    <div>
    <ul v-for="animal in filterAnimals" :key="pid">
        <a  :href="'./petpage.html?id='+animal.pid"  >
            <li class="waitsforhome-li">
                <div class="home-1">
                    <div class="dogpp">
                        <img :src="imgURL+animal.image" alt="">
                    </div>
                    <div class="dogtt">
                        <h1>{{animal.name}}</h1>
                        <h4>收養日期:{{animal.date}} 性別:{{animal.gender}}</h4>
                        <p>◎救援經過：{{animal.dest}}</p>
                        <p>◎預防針施打狀況：{{animal.vax}}</p>
                    </div>
                </div>
            </li>
        </a>
    </ul>
    </div>
    `,
    mounted(){
        
    },
    
    
})


new Vue({
    el: '#waitsforhomeApp',
    data: {
        classObj: {
            'ballstyle': false,
        },
        isOpen: false,
        reactArr: [],
        olClass: 'hide',

        pages:0,
        //頁碼給個變數 撈取資料去改動
        
        currentPage: 1,
        //預設從第一頁開始
        content: 'CatAndDog',
        // content頁面
        animalType:null,
        // 為了點擊click事件所設定的變數
        animals:[],
        // 接收資料的空陣列 擺出來放 為了可以做頁碼
        // animalType: ['brown','flower','black','white','smalldog','mediumdog','bigdog']
    },
    mounted() {
        
        let reactTotal = document.querySelectorAll('.hide')
        // console.log(reactTotal);
        reactTotal.forEach((item) => {
            this.reactArr.push(item)
            console.log(this.reactArr);
        });
        
        // PHP也由外面接收 去跑陣列
        fetch('./php/searchCatAndDog.php')
        .then(resp => resp.json())
        .then(resp => {
            this.animals = resp;
            this.pages = Math.ceil(this.animals.length /3);
            // 上面是陣列的頁碼長度去除已三 讓頁碼可以劃分資料
            
            
        });
    },
    methods: {
        pagepet(index){
            console.log(index)
            this.currentPage = index;
            // 點擊頁碼等於他的質去控制顯示第幾頁
            
        },
        
        itemClick(value){
            this.animalType = value;
            let _animals = this.animals.filter((animal) => {
                return animal.pkind  === this.animalType;
            })
            this.pages = Math.ceil(_animals.length /3);
            this.currentPage = 1;
            console.log(value);
            
            // 這邊是頁碼 篩選過後的資料顯示 篩選完後頁碼都要切回第一頁
            
        },
        left(){
            //控制頁碼往前一頁 寫個判斷式讓頁碼不會小於0
            this.currentPage--
            if(this.currentPage <=0){
                this.currentPage=1
            }
        },
        right(){
            //控制頁碼往後一頁 判斷式讓頁碼切換不會大於頁碼最大值
            this.currentPage++
            if(this.currentPage >= this.pages){
                this.currentPage = this.pages
            }
        },
        toggle(order) {
            let length = this.reactArr.length,
                i = 0;
            // console.log(length);
            // console.log(this.reactArr[order]);

            if (this.isOpen === false) {
                // console.log(this.reactArr[order]);
                this.reactArr[order].classList.remove('hide');
                this.reactArr[order].classList.add('show');
                // console.log(this.reactArr[order].previousElementSibling);
                this.reactArr[order].previousElementSibling.classList.add('turnRight');
                this.isOpen = true;

                for (i; i < length; i++) {
                    if (order != i) {
                        this.reactArr[i].classList.remove('show');
                        this.reactArr[i].classList.add('hide');
                        this.reactArr[i].previousElementSibling.classList.remove('turnRight');
                    }
                }
            } else if (this.isOpen === true && this.reactArr[order].classList.contains('hide')) {
                this.reactArr[order].classList.remove('hide');
                this.reactArr[order].classList.add('show');
                this.reactArr[order].previousElementSibling.classList.add('turnRight');

                for (i; i < length; i++) {
                    if (order != i) {
                        this.reactArr[i].classList.remove('show');
                        this.reactArr[i].classList.add('hide');
                        this.reactArr[i].previousElementSibling.classList.remove('turnRight');
                    }
                }
            } else {
                this.reactArr[order].classList.remove('show');
                this.reactArr[order].classList.add('hide'); this.reactArr[order].previousElementSibling.classList.remove('turnRight');
                this.isOpen = false;
            }
        },
    },

    

});