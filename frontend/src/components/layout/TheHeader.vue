<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>

export default {
    props:{
        'title':{
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
header{
    width: 100%;
    height: 5rem;
    background-color: #f08102;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}
header h1{
    color: white;
    margin: 0;
}

</style>
