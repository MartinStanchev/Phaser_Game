#include <stdio.h>
#include <unistd.h>

int main (int argc, char** argv) {
  printf("hi\n");

  char* args[] = {
    "/bin/ls".
    "-1",
    NULL
  };
  
  execv("execv");
  
  printf("bb\n");
  
  return 0;
}
