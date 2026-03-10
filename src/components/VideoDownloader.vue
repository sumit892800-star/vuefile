<script setup>
import { ref, computed, watch } from "vue"

const url = ref("")
const loading = ref(false)
const preview = ref(null)
const fetched = ref(false)

const detectedType = computed(() => {
    if (!url.value) return null

    if (url.value.includes("/reel/")) return "reel"
    if (url.value.includes("/p/")) return "post"
    if (url.value.includes("/stories/")) return "story"

    return null
})

watch(url, (val) => {
    preview.value = null

    if (!val) return

    preview.value = {
        type: "placeholder",
        thumbnail: "https://via.placeholder.com/500x500?text=Instagram+Preview"
    }
})


const handleDownload = () => {

    if (!url.value) return

    loading.value = true
    fetched.value = false
    preview.value = null

    // simulate backend call
    setTimeout(() => {

        preview.value = {
            type: "video",
            url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        }

        loading.value = false
        fetched.value = true

    }, 1500)

}
</script>

<template>
    <div class="page">

        <!-- HEADER -->
        <h1 class="title">
            Instagram Video Downloader
        </h1>

        <!-- INPUT -->
        <div class="input-wrapper">
            <input v-model="url" placeholder="Paste Instagram Reel or Post URL..." />

            <button @click="handleDownload">
                Download
            </button>
        </div>

        <!-- AUTO DETECT GRID -->
        <div class="grid">

            <div class="card" :class="{ active: detectedType === 'reel' }">
                <h3>Reel Download</h3>
                <p>Download Instagram reels in HD</p>
            </div>

            <div class="card" :class="{ active: detectedType === 'post' }">
                <h3>Post Download</h3>
                <p>Download Instagram posts & videos</p>
            </div>

            <div class="card" :class="{ active: detectedType === 'story' }">
                <h3>Story Download</h3>
                <p>Download public stories</p>
            </div>

        </div>

        <!-- LOADING -->
        <div v-if="loading" class="loading">
            Fetching media...
        </div>

        <!-- PREVIEW -->
        <div v-if="fetched && preview" class="preview">

            <div class="preview-wrapper">

                <video v-if="preview.type === 'video'" controls :src="preview.url"></video>

                <a :href="preview.url" download class="download-btn">
                    DOWNLOAD
                </a>

            </div>

        </div>

    </div>
</template>

<style scoped>
.page {
    max-width: 900px;
    margin: auto;
    padding: 40px 20px;
    font-family: Arial;
}

.title {
    text-align: center;
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 30px;
}

.input-wrapper {
    display: flex;
    gap: 10px;
    margin-bottom: 35px;
}

.input-wrapper input {
    flex: 1;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 15px;
}

.input-wrapper button {
    padding: 14px 24px;
    border: none;
    border-radius: 10px;
    background: #ff2c6d;
    color: white;
    font-weight: 600;
    cursor: pointer;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    padding: 10px 22px;
    border-radius: 14px;
    border: 1px solid #eee;
    background: transparent;
    transition: .25s;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
}

.card.active {
    border: 2px solid #ff2c6d;
}

.loading {
    text-align: center;
    margin: 20px;
}

.preview-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 10px;
}

.preview-wrapper video {
    width: 100%;
    max-width: 450px;
    border-radius: 12px;
}

.download-btn {
    writing-mode: vertical-rl;
    text-orientation: upright;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px 5px;
    /* background: #919090; */
    border: 2px solid #ccc;
    color: white;
    text-decoration: none;
    font-weight: bold;
    border-radius: 10px;

    min-width: 40px;
}
</style>