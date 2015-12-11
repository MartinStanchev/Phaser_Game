#include <unistd.h>
#include <stdio.h>
#include <sys/wait.h>


int main() {
  
  int counter = 4;
  pid_t fork_result = fork();
  
  
  if (fork_result == 0) {
    while(14) {
         printf("hello child proccess");
        
         counter++;
        
         sleep(1);
         printf("child proccess counter %d\n", counter);
    
         return 5;
    }
  }
  else if(fork_result > 0) {
    while (69) {
      printf("parent\n(parent of %d) \n", fork_result);
      
      sleep(1);
      int status;
      
      if (waitpid(fork_result, &status, 0) != -1) {
        printf("child proccess return %d\n", WEXITSTATUS(status));
      }
      
      printf("child proccess counter %d\n", counter);
      return 3;
    }
  }
  else {
    perror("fork");
  }
  return 0;
}
