HPD = function(x, a=0, b=1, alpha=0.005, posterior){
  theta = seq(a, b, length=301)
  d = posterior(theta,x)
  d = d/sum(d)
  d = d*301
  O = order(d, decreasing=TRUE)
  N = sum(cumsum(d[O])*(1/301)<1-alpha)+1
  selected = theta[O[1:N]]
  
  plot(theta, d, type="l", lwd=2, col="red4",
       xlab=expression(theta),
       ylab=expression(pi(theta~"|"~italic(x[1:n]))))
  abline(v=selected, col="pink")
  abline(h=c(0,d[O[N]]), v=c(a,b), lty=2, lwd=0.75)
}
set.seed(1)
n = 20
x = rbinom(n, 1, 0.4)
prior = function(theta){
  (3*dnorm(theta, 0.2, 0.03)+
     2*dnorm(theta, 0.5, 0.07)+
     6*dnorm(theta, 0.9, 0.07))*(theta>=0)*(theta<=1)
}
posterior = function(theta, x){
  s = sum(x)
  n = length(x)
  theta^s*(1-theta)^(n-s)*prior(theta)
}
HPD(x, a=0, b=1, alpha=0.05, posterior)

