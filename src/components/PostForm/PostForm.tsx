import { useLazyQuery, useMutation } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import GQL_CREATE_POST from '../../graphql/mutations/create-post';
import GQL_EDIT_POST from '../../graphql/mutations/edit-post';
import GQL_GET_POST from '../../graphql/queries/get-post';
import LoadingComponent from '../Loading/Loading';
import SimpleMessage from '../SimpleMessage/SimpleMessage';
import './styles.css';

type PostFormProps = {
  isEdit?: boolean;
};

const PostForm = ({ isEdit }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { id } = useParams();

  const [createPost, { error }] = useMutation(GQL_CREATE_POST, {
    onCompleted() {
      toast('Post created successfully!', {
        className: 'message',
      });
    },
  });

  const [editPost, { error: errorEdit }] = useMutation(GQL_EDIT_POST, {
    onCompleted() {
      toast('Post edited successfully!', {
        className: 'message',
      });
    },
  });

  const [getPost, { loading: loadingGet, error: errorGet }] = useLazyQuery(
    GQL_GET_POST,
    {
      onCompleted: (data) => {
        setTitle(data?.post?.title);
        setBody(data?.post?.body);
      },
    },
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      await editPost({
        variables: {
          updatePostId: id,
          data: {
            title,
            body,
          },
        },
      });
      return;
    }

    await createPost({
      variables: {
        data: {
          title,
          body,
        },
      },
      /*
      update: (cache, { data }) => {
        const newPostRef = cache.writeFragment({
          fragment: GQL_FRAGMENT_POST,
          data: data.createPost,
          variables: {
            id: data.createPost.id,
          },
        });

        cache.modify({
          fields: {
            posts: (existing = []) => {
              return [newPostRef, ...existing];
            },
          },
        });
      },
      */
    });
  };

  useEffect(() => {
    if (!id) return;

    getPost({
      variables: {
        postId: id,
      },
    });
  }, [id, getPost]);

  if (loadingGet) {
    return <LoadingComponent />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <p>Title: </p>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <p>Body: </p>
          <textarea
            name="postBody"
            id="postBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button>{isEdit ? 'Edit post' : 'Create post'}</button>
      </form>
      {error || errorEdit || errorGet ? (
        <SimpleMessage
          message={
            error?.message ||
            errorEdit?.message ||
            errorGet?.message ||
            'There is an error'
          }
          type="error"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PostForm;
