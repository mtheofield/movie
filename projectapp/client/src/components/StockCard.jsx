export default function StockCard({ stock }) {
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{stock.name}</h5>

            <a className='btn btn-light' href={`/stocks/${stock.id}`}>
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong>{stock.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
