export default function formatTimestamp(timestamp: string) {
   // Create a new Date object from the timestamp
   const date = new Date(timestamp);

   // Format the date into a readable string
   const formattedDate = date.toLocaleDateString();

   return formattedDate;
}
