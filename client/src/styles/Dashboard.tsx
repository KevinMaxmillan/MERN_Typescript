import styled from "styled-components";

// Container for the entire dashboard
export const DashboardContainer = styled.div`
  margin-top: 100px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  
  margin-left: auto;
  margin-right: auto;  
`;



export const WelcomeMessage = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;


export const AddPostButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 30px;
  align-self: flex-end;

  &:hover {
    background-color: #218838;
  }
`;


export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 800px; 
  max-height: 100vh; 
  overflow-y: auto; 
`;


export const PostItem = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

export const PostBody = styled.p`
  font-size: 16px;
  color: #b0b0b0;
`;

export const PostButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


export const ModalContainer = styled.div`
  background-color: #2c2c2c;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;


export const AddPostForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const EditPostForm = styled(AddPostForm)``;

export const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  font-size: 16px;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ActionButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const CancelButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;


export const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }
`;
