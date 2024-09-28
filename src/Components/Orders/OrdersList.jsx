import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total order : {meta.pagination.total}</h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* TABLE HEADING */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Product</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          {orders.map((order) => {
            const { id, name, address, orderTotal, cartItems, createdAt } =
              order.attributes;
            const formattedDate = day(createdAt).format(
              "hh:mm a - MMM Do, YYYY "
            );

            // console.log("order.attributes : ", order.attributes);

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{address}</td>
                <td>{cartItems.length}</td>
                <td>{orderTotal}</td>
                <td className="hidden sm:block">{formattedDate}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
