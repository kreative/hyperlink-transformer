import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

// this is the 'transformer' for Kreative Hyperlink
// this page will use the extension to create a new click with the api and get back the target url
// upon success of the API call, the function will direct the client to the target URL
// this page should NOT render when it's actually passing and working
export default function Transformer() {
  const router = useRouter();
  const { extension } = router.query;

  useEffect(() => {
    // this ensures that nothing happens until react can get the :extension variable
    if (!extension) return;

    // function that executes business logic and redirection
    const transform = () => {
      axios
        //.get("https://hyperlink-api.kreativeusa.com") // this is the production URL
        .get(`https://kreative-hyperlink-api.herokuapp.com/v1/clicks/transform/${extension}`)
        .then((response) => {
          // http status code is between 200-299
          if ((response.data.statusCode as number) === 200) {
            // retrieve the target url from response
            const targetUrl = response.data.data.target;
            // redirects the user to the target url and essentially stops page from rendering
            window.location.href = targetUrl;
          } else {
            // this shouldn't happen, as the only positive response from the server is 200
            // however in the event that another status code between 200-299 shows up we redirect
            // the user to the Kreative Hyperlink error page
            console.log(response.data);
            window.location.href = "https://kreativehyperlink.com/404";
          }
        })
        .catch((error) => {
          // eventually this should be a more sophisticated logger with mezmo
          console.log(error.response.data);
          // regarldess of the error, the user will be redirected to the 404 page
          // though the most likely cause of the error is that there was nothing found with a given extension
          window.location.href = "https://kreativehyperlink.com/404";
        });
    };

    transform();
  }, [extension]);

  return <></>;
}
