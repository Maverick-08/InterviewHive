// const txt = "lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptas nihil id quae, hic, voluptatum suscipit sapiente necessitatibus sit laudantium eum exercitationem earum rerum temporibus enim soluta. Cum maxime vel ratione ea quae veniam dignissimos blanditiis unde consequatur, eum odit autem, molestiae, praesentium omnis fugiat nisi rem. Numquam, cum sit atque tempore impedit iure adipisci non quis omnis sunt voluptatem commodi! Nemo tenetur est omnis a, modi perferendis libero ex explicabo repellat ipsum non porro rem tempore vero eos blanditiis doloremque minus, ut laboriosam velit mollitia commodi ea quibusdam at. Eos voluptates, quam explicabo facilis perspiciatis libero magni ab est? Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus provident, dolores obcaecati, eum veritatis, cum enim laudantium soluta ratione eveniet deserunt doloremque natus fugit possimus nostrum earum esse recusandae tempore neque. Hic, enim quos delectus corporis corrupti exercitationem odio quia eligendi veniam velit. Autem voluptatibus reprehenderit ea nulla cum a blanditiis modi mollitia officia voluptatum dolores pariatur itaque, delectus harum facilis ullam earum incidunt, eaque fuga inventore provident? Quia fugit molestias odio. Qui quas porro aspernatur nostrum iste, sed adipisci itaque alias blanditiis iure voluptatem voluptates quibusdam facere dolore repellendus fugiat nam, animi nesciunt voluptas voluptatum cumque! Libero similique est expedita neque. Expedita optio nisi voluptate? Necessitatibus, dolorum sint! In eos culpa fuga autem suscipit velit, inventore sapiente odio vitae reprehenderit totam tempora dolorum aliquid debitis possimus nesciunt, iusto consequatur voluptatum amet doloribus cum nobis deserunt sunt laborum. Magni iusto culpa cumque beatae impedit neque nesciunt in voluptates eaque. Omnis nihil quo minus neque. Eius in doloremque esse, enim itaque eligendi natus totam autem possimus fugit dolorum, cum modi molestias assumenda hic quaerat. Ullam enim deserunt laudantium error, dolores harum optio earum? Aut eos porro aliquid consequatur, illum eveniet quaerat reiciendis culpa iusto, laudantium enim provident quis sed error." 


const Message = ({
  message,
  sentBy,
}: {
  message: string;
  sentBy: "user" | "llm";
}) => {
  return (
    <div
      className={`flex ${sentBy == "user" ? "justify-end" : "justify-start"}`}
    >
      <span
        className={`text-sm max-w-xs py-1 px-2 rounded-md break-words text-balance ${
          sentBy == "user" ? "w-full bg-amber-300/90 text-black" : "bg-neutral-700/40 "
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
