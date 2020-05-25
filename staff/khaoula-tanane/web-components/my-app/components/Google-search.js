class Google extends Component{
    constructor(callback){
        super(`<section>
        <input type="text" name="search" placeholder="Google search">
      </section>`)

    const input = this.container.querySelector("input");
   
    input.addEventListener("keyup", (event) => {
        event.preventDefault();
        const query = event.target.value;
  
        callback(query);
      })

    }
}