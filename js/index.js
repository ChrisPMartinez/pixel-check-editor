const App = {
    data() {
        return {
            "message":"",            
            "sites": []            
        }
    },
    methods: {
        getSites() {
            fetch("https://yourapigatewayurl/PixelCheckEditorAPI")
            .then(res => res.json() )
            .then(res => this.sites = res.body.sites );
        },
        removeSite(index){
            this.sites.splice(index, 1);
            this.message = "";
            this.updateFile();
        },
        addSite(){
            let input = document.getElementById("newSite");
            let site = input.value;

            if(site != ""){
                if(!site.startsWith("https://") && !site.startsWith("http://")){
                    site = "https://" + site;
                }

                const formattedSite = {
                    "url": site,
                    "pixels": []
                }

                this.sites.unshift(formattedSite);

                input.value = "";

                this.message = "Add a pixel to save new site to pixel checker file"
            }
        },
        removePixel(site, index) {
            site.pixels.splice(index, 1);
            this.message = "";
            this.updateFile();
        },
        addPixel(site, inputId) {
            let input = document.getElementById(inputId);
            let pixel = input.value;

            if (pixel != "") {
                site.pixels.push(pixel);
                input.value = "";
                this.message = "";
                this.updateFile();
            }
        },
        updateFile(){
            this.sites.sort((a,b) => (a.url > b.url) ? 1 : -1);
            let rawdata = { "sites" : this.sites };

            let payload = JSON.stringify(rawdata);

            fetch("https://yourapigatewayurl/PixelCheckEditorAPI",
            {
                method: "POST",
                body: payload                
            }).then(res => res.json())
            .then(res => this.message = res.body)
            .then(() => setTimeout(()=> this.message = "", 5000))            
        }
    },
    created () {
        this.getSites();
    }
}

Vue.createApp(App).mount("#app");