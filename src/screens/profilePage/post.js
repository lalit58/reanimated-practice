import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useGetPostsQuery} from '../../store/slices/apiSlice';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]); // Store the loaded posts using state
  const [page, setPage] = useState(1); // Track the current page using a ref
  const hasMoreData = useRef(true); // Track if there's more data using a ref

  // Fetch data based on the current page
  const {data: posts, error, isLoading, isFetching} = useGetPostsQuery(page);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setAllPosts(prevPosts => [...prevPosts, ...posts]); // Append new posts to the state

      // If the returned posts are less than the page limit (assumed to be 10), no more data to fetch
      if (posts.length < 10) {
        hasMoreData.current = false; // No more data to fetch
      }
    } else if (posts && posts.length === 0) {
      // If the API returns an empty array, stop fetching more data
      hasMoreData.current = false;
    }
  }, [posts]);

  const handleLoadMore = () => {
    if (hasMoreData.current && !isFetching) {
      setPage(page + 1); // Increment the page number in the ref
    }
  };

  if (isLoading && page === 1) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching posts!</Text>;
  }
  console.log('allPostsallPostsallPosts', allPosts?.length);

  return (
    <View>
      <FlatList
        data={allPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{padding: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        // Show a loading indicator at the bottom when fetching more data
        ListFooterComponent={() =>
          isFetching ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : !hasMoreData.current ? (
            <Text style={{textAlign: 'center', padding: 10}}>No more data</Text>
          ) : null
        }
        onEndReached={handleLoadMore} // Called when user reaches the end of the list
        onEndReachedThreshold={0.5} // Adjusts when to trigger load more
      />
    </View>
  );
};

export default Posts;
