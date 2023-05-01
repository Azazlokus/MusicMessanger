package com.example.tasklist.domain.state;

public class AlertStateContext {
    private MobileAlertState currentState;

    public AlertStateContext() {
        this.currentState = new Vibration();
    }
    public void setState(MobileAlertState state){
        currentState=state;
    }
    public void alert(){
        currentState.alert(this);
    }

    public static void main(String[] args) {
        System.out.println("\n\tState");
        AlertStateContext stateContext = new AlertStateContext();
        stateContext.alert();
        stateContext.alert();
        stateContext.alert();
        stateContext.setState(new Silent());
        stateContext.alert();
        stateContext.alert();
        stateContext.alert();

    }
}
