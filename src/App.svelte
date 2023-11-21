<script>
    let count=0;
    function makeRect(){
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
    }
</script>

<h2>Rectangle Creator</h2>
<p>Count: <input id="count" value={count}></p>
<button on:click={makeRect}>Create</button>
<button>Cancel</button>

<style>
    button{background-color: aqua;}
</style>